package com.example.mopcon_android.ui.all.home

import com.example.mopcon_android.network.service.ApiService

class HomeRepository(private val apiService: ApiService) {
    suspend fun getHomeBannerAndNews() = apiService.getHomeBannerAndNews()
}
