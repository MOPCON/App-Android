package com.example.mopcon_android.ui.all.news

import com.example.mopcon_android.network.service.ApiService

class NewsRepository(private val apiService: ApiService) {
    suspend fun getNews() = apiService.getNews()
}
