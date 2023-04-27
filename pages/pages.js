import Game from "./Game";
import GameParameters from "./GameParameters";

import Menu from "./Menu";

import PlayerNames from "./PlayerNames";

import PrevNames from "./PrevNames";

import Settings from "./Settings";

import SettingsThemes from "./SettingsThemes";

import GameInfo from "./GameInfo";

/*
* All of the pages that are rendered in App.js. This object is imported by App.js.
*/
const pages = 
{
    game: Game,
    gameParameters: GameParameters,
    menu: Menu,
    playerNames: PlayerNames,
    prevNames: PrevNames,
    settings: Settings,
    settingsThemes: SettingsThemes,
    gameInfo: GameInfo
}

export default pages;