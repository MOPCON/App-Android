package org.mopcon.session.app.util

object Constants {

    val MOPCON_API_URL = "https://mopcon.org/"
//    fun setApiUrl(url: String) { MOPCON_API_URL = url }
//    fun getApiUrl(): String = MOPCON_API_URL

    private var MOPCON_GAME_API_URL = "https://game.mopcon.org/"
    fun setGameUrl(url: String) { MOPCON_GAME_API_URL = url }
    fun getGameUrl(): String = MOPCON_GAME_API_URL

    var isGameEnable = true

}