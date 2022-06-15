# Contributing to _NiRV_

Welcome to the _NiRV_ repository! We're excited you're here and want to
contribute.

**Imposter's syndrome disclaimer**[^1]: We want your help. No, really.

There may be a little voice inside your head that is telling you that
you're not ready to be an open-source contributor; that your skills
aren't nearly good enough to contribute. What could you possibly offer a
project like this one?

We assure you - the little voice in your head is wrong. If you can
write code at all, you can contribute code to open-source. Contributing
to open-source projects is a fantastic way to advance one's coding
skills. Writing perfect code isn't the measure of a good developer (that
would disqualify all of us!); it's trying to create something, making
mistakes, and learning from those mistakes. That's how we all improve,
and we are happy to help others learn.

Being an open-source contributor doesn't just mean writing code, either.
You can help out by writing documentation, tests, or even giving
feedback about the project (and yes - that includes giving feedback
about the contribution process). Some of these contributions may be the
most valuable to the project as a whole, because you're coming to the
project with fresh eyes, so you can see the errors and assumptions that
seasoned contributors have glossed over.

## Practical guide to submitting your contribution

These guidelines are designed to make it as easy as possible to get involved.
If you have any questions that aren't discussed below, please let us know by
opening an [issue][link_issues]!

Before you start, you'll need to set up a free [GitHub][link_github] account
and sign in. Here are some [instructions][link_signupinstructions].

Already know what you're looking for in this guide? Jump to the following sections:

- [Joining the conversation](#joining-the-conversation)
- [Contributing through Github](#contributing-through-github)
- [Understanding issues](#understanding-issues)
- [Understanding the _NiRV_ source code](#understanding-the-nirv-source-code)
- [Making a change](#making-a-change)
- [Structuring contributions](#nirv-coding-style-guide)
- [Licensing](#licensing)

## Joining the conversation

_NiRV_ is primarily maintained by a [collaborative research group][link_autofq].
But we maintain this software as an open project. This means that we welcome
contributions from people outside our group and we make sure to give
contributors from outside our group credit in presentations of the work. In
other words, we're excited to have you join! Most of our discussions will
take place on open [issues][link_issues]. We actively monitor this space and
look forward to hearing from you!

## Contributing through GitHub

[git][link_git] is a really useful tool for version control.
[GitHub][link_github] sits on top of git and supports collaborative and distributed working.

If you're not yet familiar with `git`, there are lots of great resources to
help you _git_ started!
Some of our favorites include the [git Handbook][link_handbook] and
the [Software Carpentry introduction to git][link_swc_intro].

On GitHub, You'll use [Markdown][link_markdown] to chat in issues and pull
requests. You can think of Markdown as a few little symbols around your text
that will allow GitHub to render the text with a little bit of formatting.
For example, you could write words as bold (`**bold**`), or in italics
(`*italics*`), or as a [link][link_rick_roll]
(`[link](https://youtu.be/dQw4w9WgXcQ)`) to another webpage.

GitHub has a really helpful page for getting started with [writing and
formatting Markdown on GitHub][link_writing_formatting_github].

## Understanding issues

Every project on GitHub uses [issues][link_issues] slightly differently.

The following outlines how the _NiRV_ developers think about these tools.

- **Issues** are individual pieces of work that need to be completed to move the project forward.
  A general guideline: if you find yourself tempted to write a great big issue that
  is difficult to be described as one unit of work, please consider splitting it into two or more issues.

      Issues are assigned [labels](#issue-labels) which explain how they relate to the overall project's
      goals and immediate next steps.

### Issue Labels

The current list of issue labels are [here][link_labels] and include:

- [![Good first issue](https://img.shields.io/github/labels/ni-report-viewer/nirv/good%20first%20issue)][link_firstissue] _These issues contain a task that is amenable to new contributors because it doesn't entail a steep learning curve._

  If you feel that you can contribute to one of these issues,
  we especially encourage you to do so!

- [![Bug](https://img.shields.io/github/labels/ni-report-viewer/nirv/bug)][link_bugs] _These issues point to problems in the project._

  If you find new a bug, please give as much detail as possible in your issue,
  including steps to recreate the error.
  If you experience the same bug as one already listed,
  please add any additional information that you have as a comment.

- [![Enhancement](https://img.shields.io/github/labels/ni-report-viewer/nirv/enhancement)][link_enhancement] _These issues are asking for new features and improvements to be considered by the project._

  Please try to make sure that your requested feature is distinct from any
  others that have already been requested or implemented.  If you find one
  that's similar but there are subtle differences, please reference the other
  request in your issue.

- [![Documentation](https://img.shields.io/github/labels/ni-report-viewer/nirv/documentation)][link_documentation] _These issues are asking for improvements to the documentation._

  Documentation is crucially important for both _NiRV_ users and developers, so
  these are helpful issues to open. Even better, you should feel free to suggest
  additions to the documentation.

## Understanding the _NiRV_ source code

<!-- TODO: Add an overview of the Vue app structure. -->
Coming Soon. Please check back in a bit.

## Making a change

We appreciate all contributions to _NiRV_,
but those accepted fastest will follow a workflow similar to the following:

1. **Comment on an existing issue or open a new issue referencing your addition.**<br />
   This allows other members of the _NiRV_ development team to confirm that
   you aren't overlapping with work that's currently underway and that
   everyone is on the same page with the goal of the work you're going to
   carry out.<br /> [This blog][link_pushpullblog] is a nice explanation of
   why putting this work in up front is so useful to everyone involved.

1. **[Fork][link_fork] the [nirv repository][link_nirv] to your profile.**<br />
   This is now your own unique copy of _NiRV_.
   Changes here won't effect anyone else's work, so it's a safe space to
   explore edits to the code!
   On your own fork of the repository, select Settings -> Actions-> "Disable
   Actions for this repository" to avoid flooding your inbox with warnings
   from our continuous integration suite.

1. **[Clone][link_clone] your forked _NiRV_ repository to your machine/computer.**<br />
   While you can edit files [directly on github][link_githubedit], sometimes
   the changes you want to make will be complex and you will want to use a
   [text editor][link_texteditor] that you have installed on your local
   machine/computer. (One great text editor is [vscode][link_vscode]).<br />
   In order to work on the code locally, you must clone your forked repository.<br />
   To keep up with changes in the _NiRV_ repository,
   add the ["upstream" _NiRV_ repository as a remote][link_addremote]
   to your locally cloned repository.

   ```shell
   git remote add upstream https://github.com/ni-report-viewer/nirv.git
   ```

   Make sure to [keep your fork up to date][link_updateupstreamwiki] with the upstream repository.<br />
   For example, to update your main branch on your local cloned repository:

   ```shell
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

1. **Install prerequisite software**<br />
   _NiRV_ is a javascript project and its development depends on the
   installation of some prerequisite software. First, [you must install
   Node.js][link_nodeinstall]. You can verify that you have installed Node.js by
   typing

   ```shell
   node -v
   ```

   This should return a version number. Then, install the yarn package manager globally by typing

   ```shell
   sudo npm install -g yarn
   ```

   After the package installs, have the yarn command print its own version number. This will let you verify it was installed properly:

   ```shell
   yarn --version
   ```

1. **Install a development version of _NiRV_ so that your local changes are reflected in your local tests**<br />
   You can install a development version of _NiRV_ by navigating to the root of your _NiRV_ repository and then typing

   ```shell
   yarn install
   ```

   You can then compile your development version of the _NiRV_ website using

   ```shell
   yarn serve
   ```

   This will serve the website from your local file system, print a localhost
   URL for you to access the website, and "hot-reload" the website with each
   change you make to the source code.

1. **Create a [new branch][link_branches] to develop and maintain the proposed code changes.**<br />
   For example:

   ```shell
   git fetch upstream  # Always start with an updated upstream
   git checkout -b fix/bug-1222 upstream/main
   ```

   Please consider using appropriate branch names as those listed below:

   | Branch name             | Use case                       |
   | ----------------------- | ------------------------------ |
   | `fix/<some-identifier>` | for bugfixes                   |
   | `enh/<feature-name>`    | for new features               |
   | `doc/<some-identifier>` | for documentation improvements |

   You should name all your documentation branches with the prefix `doc/`
   as that will preempt triggering the full battery of continuous integration tests.

1. **Make the changes you've discussed, following the [_NiRV_ coding style guide](#nirv-coding-style-guide).**<br />
   Try to keep the changes focused: it is generally easy to review changes that address one feature or bug at a time.
   Assuming you installed a development environment above, you can test your local changes using

   ```shell
   yarn serve
   ```

   And check it for coding style compliance using

   ```shell
   yarn lint
   ```

   Once you are satisfied with your local changes, [add/commit/push them][link_add_commit_push]
   to the branch on your forked repository.

1. **Submit a [pull request][link_pullrequest].**<br />
   A member of the development team will review your changes to confirm
   that they can be merged into the main code base.<br />
   Pull request titles should begin with a descriptive prefix
   (for example, `ENH: Adding another estimator class`):

   - `ENH`: enhancements or new features
   - `FIX`: bug fixes
   - `TST`: new or updated tests
   - `DOC`: new or updated documentation
   - `STY`: style changes
   - `REF`: refactoring existing code
   - `CI`: updates to continous integration infrastructure
   - `MAINT`: general maintenance
   - For works-in-progress, add the `WIP` tag in addition to the descriptive prefix.
     Pull-requests tagged with `WIP:` will not be merged until the tag is removed.

1. **Have your PR reviewed by the development team, and update your changes accordingly in your branch.**<br />
   The reviewers will take special care in assisting you to address their
   comments, as well as dealing with conflicts and other tricky situations
   that could emerge from distributed development. And if you don't make the
   requested changes, we might ask [@bedevere-bot][link_bedevere] to [poke
   you with soft cushions][link_bedevere_video]!

## _NiRV_ coding style guide

We use the [ESLint][link_black] via the [`@vue/cli-plugin-eslint` plugin][link_vuecliservicelint] for format our code
contributions to a common style. All pull requests will automatically be
checked for compliance so we recommend that you run the following command before submitting your pull request.

```shell
yarn lint
```

<!-- ### Documentation -->
<!-- TODO: Add a guide to the documentation -->

## Licensing

_NiRV_ is licensed under the MIT license. By contributing to _NiRV_, you
acknowledge that any contributions will be licensed under the same terms.

[^1]:
    The imposter syndrome disclaimer was originally written by
    [Adrienne Lowe](https://github.com/adriennefriend) for a
    [PyCon talk](https://www.youtube.com/watch?v=6Uj746j9Heo), and was
    adapted based on its use in the README file for the
    [MetPy project](https://github.com/Unidata/MetPy).

[link_add_commit_push]: https://help.github.com/articles/adding-a-file-to-a-repository-using-the-command-line
[link_addremote]: https://help.github.com/articles/configuring-a-remote-for-a-fork
[link_autofq]: https://autofq.org/
[link_bedevere]: https://github.com/search?q=commenter%3Abedevere-bot+soft+cushions
[link_bedevere_video]: https://youtu.be/XnS49c9KZw8?t=1m7s
[link_black]: https://black.readthedocs.io/en/stable/
[link_branches]: https://help.github.com/articles/creating-and-deleting-branches-within-your-repository/
[link_bugs]: https://github.com/ni-report-viewer/nirv/labels/bug
[link_clone]: https://help.github.com/articles/cloning-a-repository
[link_discussingissues]: https://help.github.com/articles/discussing-projects-in-issues-and-pull-requests
[link_enhancement]: https://github.com/ni-report-viewer/nirv/labels/enhancement
[link_documentation]: https://github.com/ni-report-viewer/nirv/labels/enhancement
[link_firstissue]: https://github.com/ni-report-viewer/nirv/labels/good%20first%20issue
[link_fork]: https://help.github.com/articles/fork-a-repo/
[link_git]: https://git-scm.com/
[link_github]: https://github.com/
[link_githubedit]: https://help.github.com/articles/editing-files-in-your-repository
[link_nirv]: https://github.com/ni-report-viewer/nirv
[link_handbook]: https://guides.github.com/introduction/git-handbook/
[link_issues]: https://github.com/ni-report-viewer/nirv/issues
[link_labels]: https://github.com/ni-report-viewer/nirv/labels
[link_markdown]: https://daringfireball.net/projects/markdown
[link_nodeinstall]: https://nodejs.dev/learn/how-to-install-nodejs
[link_pullrequest]: https://help.github.com/articles/creating-a-pull-request-from-a-fork
[link_pushpullblog]: https://www.igvita.com/2011/12/19/dont-push-your-pull-requests/
[link_rick_roll]: https://www.youtube.com/watch?v=dQw4w9WgXcQ
[link_signupinstructions]: https://help.github.com/articles/signing-up-for-a-new-github-account
[link_swc_intro]: http://swcarpentry.github.io/git-novice/
[link_texteditor]: https://en.wikipedia.org/wiki/Text_editor
[link_updateupstreamwiki]: https://help.github.com/articles/syncing-a-fork/
[link_vscode]: https://code.visualstudio.com/
[link_writing_formatting_github]: https://help.github.com/articles/getting-started-with-writing-and-formatting-on-github