package com.example.mopcon_android.repository

import com.example.mopcon_android.db.AgendaDao
import com.example.mopcon_android.db.AgendaFavData
import com.example.mopcon_android.network.service.ApiService

class AgendaRepository(private val apiService: ApiService, private val agendaDao: AgendaDao)  {

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

    fun getStoredAgenda(): List<AgendaFavData> {
        return agendaDao.getAll()
    }
}