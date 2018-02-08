# borrowIt
Point of Borrow application repository. Developed by HackWITus Team

# Contributing

### New contributors:
1. Fork repository and clone your fork locally using:

    ```
    git clone git@github.com:<YOUR-USERNAME>/borrowIt.git
    ```

    Don't forget to `cd borrowIt` after cloning.

2. Add the `upstream` repository using:

    ```
    git remote add upstream git@github.com:hackwitus/borrowIt.git
    ```

    Move on to the __Everybody__ section and continue on to step 3.

### Existing contributors: 
1. Navigate to your local clone of `borrowIt`. Checkout the master branch using: `git checkout master`
2. Then pull down any recent commits using: `git pull --rebase upstream master`. You should not have any merge conflicts because you should not be editing the master branch directly. 

    If you are trying to update a working branch: 
      1. Write down any commit hashes you want to keep
      2. Then: `git fetch upstream`
      3. Followed by: `git reset --hard upstream/master`
      4. Then for each of your commit hashes: `git cherry-pick <commit hash>`
      5. Finally: `git push -f`

### Everybody contributing:
3. Create a new branch with `git checkout -b branch-name`
4. Write your code and when your done run the following:

    ```
    git add .
    git commit -m 'Descriptive commit message'
    git push origin branch-name
    ```

    You have now pushed your _new code_ to __your__ repository. 

5. Navigate to the [`upstream`](https://github.com/hackwitus/borrowIt.git) repository and create a __new pull request__
6. If GitHub doesn't automatically select your new branch make sure to enable `compare across forks`
7. Enter a descriptive pull request name and description and 🎉 your code is now ready to be reviewed by another developer!

