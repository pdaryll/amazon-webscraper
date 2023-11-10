# Amazon Webscraper

A basic webscraper for Amazon which scrapes the search results of the first page of the given key word/item.

## How To Setup Project

1. Fork and clone this repository. To learn how to fork a repository, see the GitHub documentation on how to [fork a repo](https://docs.github.com/en/get-started/quickstart/fork-a-repo).
   - Copies of repositories on your machine are called clones. If you need help cloning to your local environment you can learn how from the GitHub documentation on [cloning a repository](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository-from-github/cloning-a-repository).
2. Before running the code, you should first ensure you have the following installed:
   - **NPM**. Just in case you need to check, type `npm --version` in your terminal. If you get back `Command 'npm' not found, but can be installed with:`, just follow instructions on the internet.
   - **Node.js**. It is suggested to use `nvm` to install Node because it's more convenient. Just search online how to do it with your OS. Once it's installed. run the command `nvm install --lts`. This will install the most recent stable version of Node in ‘long-term support’ (LTS). We then need to tell nvm which version of Node to use when we run the node command. It’s easy; just run the following command: `nvm use --lts`. Now run `node -v`, you should see a version number if it was installed correctly.
3. After cloning this repository to your local machine and installing NPM, go into the newly created directory (`cd amazon-webscraper`) and run `npm install`. This will install and set up the platform based on our preconfigured settings. (Note: if you get warnings that packages are out of date or contain vulnerabilities, you can safely ignore them for this project.)
4. You should now have all the dependencies installed and ready to go. In the terminal, run `npm run build` (make sure you are in the `amazon-webscraper` directory!). This will start Node and run Express from the app.js file. You should see a link in the terminal, Crtl+Click it to open it in a browser. Have fun!