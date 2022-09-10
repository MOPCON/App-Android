package com.example.mopcon_android.repository

import android.content.Context
import android.content.SharedPreferences
import androidx.lifecycle.viewModelScope
import com.example.mopcon_android.db.AgendaDao
import com.example.mopcon_android.db.AgendaFavData
import com.example.mopcon_android.network.service.ApiService
import kotlinx.coroutines.launch

class AgendaRepository(/*private val androidContext: Context,*/ private val apiService: ApiService, private val agendaDao: AgendaDao)  {
    companion object {
        const val MY_SP = "MY_SP"
        const val LOGIN_KEY = "LOGIN_KEY"
    }
/*

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
*/

    suspend fun getAgenda() = apiService.getAgenda()

    suspend fun getExchange() = apiService.getExchange()

    fun storeAgenda(agendaFavData: AgendaFavData) {
        agendaDao.insert(agendaFavData)
    }

    fun deleteAgenda(sessionId:Int) {
        agendaDao.delete(sessionId)
    }

    fun getFavSessionIdList(): List<Int> {
        return agendaDao.getAllSessionId()
    }

}