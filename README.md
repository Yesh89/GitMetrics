This project lists metrics for a user-specified organization on GitHub. Metrics listed are Name of the repo, description, Programming language, no. of forks, no. of issues and a link to read me. All of the columns are sortable. Sorting also has ability of stable sort, meaning, multiple columns can be sorted retaining the first sort order. Screen also has pagination.

User can also browse through the commits by clicking on repository link. In the commits browser page, a table containing list of Commit ids, Author, Commit message and date are visible. All of the columns are sortable. User may also navigate to particular commit on Github by clicking on commit id. Screen also has pagination.

The repo metrics page can be accessed by visiting {BASE_URL}/repos?user={user} or localhost:3000/repos?user=netflix
The commits browser page can be accessed by {BASE_URL}/commits?user={user}&repo={repo} or localhost:3000/commits?user=netflix&repo=astyanax

![Alt text](RepoList.png?raw=true "Repo Metrics")
![Alt text](CommitsBrowser.PNG?raw=true "Commits browser")


**Prereqs:
1. node (v10.16.3)
2. npm (6.9.0)
3. create-react-app (optional while running)


**Steps to run the project:
1. git clone https://github.com/Yesh89/GitMetrics.git
2. cd into the project folder
3. npm install
4. npm start


**Packages used:
1. Material UI
2. React table



Challenges faced :
Latest Typescript version, React-thunk versions has issues. Dispatching of API response had issues. Downgrading the react dependencies fixed the issue but had to spend a lot of time in finding compatible versions. Package.json is forced to use particular dependency versions for this reason. 


** Manual Test cases:
Happy path:
1. Verify the flow from localhost:3000/repos?user=netflix to commits browser, read me page.
2. Pagination by changing the page number, next, back.
3. Commits browser page verify the list, sorting, navigation to commit details on github.

Deep dive testing:
1. Do not pass url param to repo page. In this case "netflix" value is defaulted.
2. Do not pass url params to commits page. In this case user will be redirected to repo list page.
3. Try to enter invalid page number and trying to overflow the pagination button clicks.
4. Disable the network connection of computer using dev tools (simulate API failure). Errors are handled gracefully and alert message is thrown.


Scope of improvement:
1. UI/UX can be made a lot better list providing details like last update time of repo, latest issues list.
2. Could have better looking UI, table filtering that involves more CSS work.
3. Can add more pages like 404, graphs to plot trending commits etc.