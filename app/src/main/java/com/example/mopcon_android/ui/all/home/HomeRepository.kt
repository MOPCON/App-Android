package com.example.mopcon_android.ui.all.home

import androidx.lifecycle.*
import com.example.mopcon_android.network.model.home.Banner
import com.example.mopcon_android.network.model.home.NewsItem
import com.example.mopcon_android.network.service.HomeApiService
import com.example.mopcon_android.util.request
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import java.util.HashMap

class HomeRepository(private val apiService: HomeApiService) {
    suspend fun getHomeBannerAndNews() = apiService.getHomeBannerAndNews()
}
