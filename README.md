# Dead or Alive

Credit: Package used for gitignore: https://www.gitignore.io/

This is the development repo. We will be using a different repo for prouction and Heroku.

In order to start this app you will need to do `npm install` and then `npm start` inside the ```api``` directory followed by going over the the ```frontend``` directory and doing `yarn install` and then `yarn start`.

# Guides for Comitting

1. Adding a feature
    - `git checkout -b doa_branchName_areaOfWork`
        - ``` git checkout -b doa_user_auth_FE ```

2. Branch Merging
    - `git checkout doa_dev_heroku`
    - `git pull`
    - `git merge your_new_branch`

# Current used API's

* API Name

      GET `/api/user/:id`

    * Requires Authentication

* API Name

        POST `/api/quiz`

    * Requires Authentication

* API Name


      POST `/api/celebrity`

    * Requires Authentication


* API Name


      POST `/api/quiz/:id`

    * Requires Authentication
    * Returns

            {username: "username", id: "id", score: 999}
