import _ from "lodash";
import axios from "axios";

const xmlParser = (input) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(input, "text/xml");
  return xmlDoc;
};

export const localhostProxy = (url) => {
  const local_domains = ["localhost", "127.0.0.1"];
  if (local_domains.includes(window.location.hostname)) {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    return proxyurl + url;
  } else {
    return url;
  }
};

const s3ListUrl = (bucket, prefix, continuationToken = null) => {
  let url = `https://${bucket}.s3.amazonaws.com/?list-type=2`;
  url += `&max-keys=100000&prefix=${prefix}`;
  if (continuationToken !== null) {
    return localhostProxy(url);
  }

  return localhostProxy(url) + `&continuation-token=${continuationToken}`;
};

/**
 * Begin S3 parsing functions
 */
const parseS3 = (
  data,
  groupReportRe = /nirv_group_report.(json|csv|tsv)/gi
) => {
  const xml = xmlParser(data);
  const keys = xml.getElementsByTagName("Key");
  const continuation = xml.getElementsByTagName("NextContinuationToken");
  const isTruncated = xml.getElementsByTagName("IsTruncated")[0].innerHTML;
  let continuationComponent;
  if (isTruncated === "true") {
    continuationComponent = encodeURIComponent(continuation[0].innerHTML);
  } else {
    continuationComponent = null;
  }
  const allKeys = _.map(keys, (k) => k.innerHTML);
  const reportsFiltered = _.filter(
    allKeys,
    (k) => k.match(groupReportRe) !== null
  );
  const keysFixed = _.uniq(reportsFiltered);
  return {
    keys: keysFixed,
    continuation: continuationComponent,
  };
};

export const manifestEntries = (bucket, s3Prefix, token) => {
  if (token === null) {
    return [];
  }

  const url = s3ListUrl(bucket, s3Prefix, token);

  return axios.get(url).then((resp) => {
    const { keys, continuation } = parseS3(resp.data);
    return _.uniq(keys.concat(manifestEntries(bucket, s3Prefix, continuation)));
  });
};

// export const loadFromS3 = (bucket, s3Prefix) => {
//   const url = s3ListUrl(bucket, s3Prefix);
//   return axios
//     .get(url)
//     .then((resp) => {
//       const keysFixed = this.parseS3(resp.data);
//       manifestEntries = _.uniq(this.manifestEntries.concat(keysFixed));
//       if (this.continuation) {
//         this.manifestEntries(this.continuation);
//       }
//     })
//     .then(() => {
//       this.groupFile = this.manifestEntries.filter(
//         (k) => k.match(that.subRe) === null
//       );
//       this.files = this.manifestEntries.filter(
//         (k) => k.match(that.subRe) !== null
//       );
//       this.selectRootGroupFiles();
//       this.loadGroupReport();
//     });
// };
// async loadGroupReport() {
//   if (this.sourceType === "s3") {
//     const resp = await axios.get(
//       localhostProxy(
//         `https://${this.bucket}.s3.amazonaws.com/${this.groupCsv}`
//       )
//     );
//     this.groupReport = resp.data;
//   }
// },
