package com.example.mopcon_android.repository

import android.content.Context
import android.content.SharedPreferences

class AgendaRepository(private val androidContext: Context)  {
    companion object {
        const val MY_SP = "MY_SP"
        const val LOGIN_KEY = "LOGIN_KEY"
    }

    private val sharedPref: SharedPreferences by lazy {
        androidContext.getSharedPreferences(MY_SP, Context.MODE_PRIVATE)
    }

    //TODO: can delete it if no need.
    var loginKey
        get() = sharedPref.getString(LOGIN_KEY, "")
        set(value) {
            with(sharedPref.edit()) {
                putString(LOGIN_KEY, value)
                apply()
            }
        }

}