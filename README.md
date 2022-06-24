# Lighting and Quaternioins

### Lalith Kumar Reddy | IMT2019509
### Manaswitha Reddy | IMT2019511
### G Sri Harsha | IMT2019030

#

### Prerequisites

Make sure you have Node and NPM installed.

- Node `v12.10.0` (_You can quickly switch to the correct version with `nvm use` if you have it installed._)
- NPM `>6.10.3`

### Development

Out-of-the-box, things are pretty simple:

1. 📦 **Install dependencies.** I use `ci` instead of `i`/`install` to avoid versioning discrepancies but live your life.

   ```bash
   npm ci
   ```

2. 🏗 **Build project.** This will just do all the bundling without starting a dev server.

   ```bash
   npm run build
   ```

3. 🛠 **Build and run development server.** This command will start a development server which watches for changes and auto-reloads at `localhost:9000`.

   ```bash
   npm start
   ```
#

## Key Bindings

### Game Control

`ArrowUp` - Move avatar towards the goal &nbsp;&nbsp;&nbsp;&nbsp; `Arowdown` - Move avatar away from the goal

`Arrowright` - Move avatar right &nbsp;&nbsp;&nbsp;&nbsp; `Arrowleft` - Move avatar left

`C` or `c` - Carry mode (default) &nbsp;&nbsp;&nbsp;&nbsp; `D` or `d` - Dribble mode &nbsp;&nbsp;&nbsp;&nbsp; `K` or `k` - Kick Mode

### Illumination

`1` - Switch on/off street light 1 &nbsp;&nbsp;&nbsp;&nbsp; `2` - Switch on/off street light 2

`3` - Switch on/off street light 3 &nbsp;&nbsp;&nbsp;&nbsp; `4` - Switch on/off street light 4

`5` - Switch on/off spot light &nbsp;&nbsp;&nbsp;&nbsp; `6` - Switch on/off search light of moving object

`+` - Select this to increase intensity (default)

`-` - Select this to decrease intensity

`!` - If + is selected increases intensity of street light 1, decreases intensity if - is selected

`@` - If + is selected increases intensity of street light 2, decreases intensity if - is selected

`#` - If + is selected increases intensity of street light 3, decreases intensity if - is selected

`$` - If + is selected increases intensity of street light 4, decreases intensity if - is selected

`%` - If + is selected increases intensity of spot light, decreases intensity if - is selected

`^` - If + is selected increases intensity of search light, decreases intensity if - is selected 

### Camera

`P` or `p` - to View the scene from the players perspective

`L` or `l` - to View the scene from the 3rd person perspective 

The following work only in player's perspective

`Q` or `q` - Rotate the player in clockwise direction

`W` & `w` - Rotate the player in anticlockwise direction

Mouse for looking around.

### Textures

`M` or `m` - Changes the texture image of car, sofa and windmill
