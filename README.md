# DirectiveManager
Companies and products are much larger than a single swim-lane planner this system helps to see the bigger picture.

## How to use:

1. Clone into the repo with `git clone git@github.com:Batrevinator/DirectiveManager.git`
5. You may run into issues if you do not have postgres installed on your machine. [Please do that if needed.](http://postgresql.org/download/)
2. Navigate into client directory and run `npm install`
3. Run `pip install -r requirements.txt` in the server directory
4. Navigate to server directory and run `py server.py`
6. In the client directory run `npm start` and you should now have a locally working version of the system
<br>
Within the system you can add a new directive and provide it information listed in the modal. <br>
To move cards in priority DOUBLE CLICK the arrows on the card (I couldn't be bothered to solve another React useState problem)<br>

## What Is This?
I recently felt like starting a project that would allow higher level organization of project management tools like Trello.<br>
This system allows users to create and manage the priority of their Trello projects.<br>
With some further development I hope to make the system provide more information about the Trello boards through API integration.

### Future Update Goals

1. Fix the useState problem in the card priority selection.
2. Add websockets so you dont need to reload to update the board.
3. Add Trello API to get metrics like velocity, progress and other relevant info on the Direcive Manager page.
