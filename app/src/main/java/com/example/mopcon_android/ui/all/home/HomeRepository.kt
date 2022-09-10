package com.example.mopcon_android.ui.all.home

import com.example.mopcon_android.db.AgendaDao
import com.example.mopcon_android.db.AgendaFavData
import com.example.mopcon_android.network.service.ApiService

class HomeRepository(private val apiService: ApiService, private val agendaDao: AgendaDao) {
    suspend fun getHomeBannerAndNews() = apiService.getHomeBannerAndNews()

    fun getStoredAgenda(): List<AgendaFavData> {
        return agendaDao.getAll()
    }
}
