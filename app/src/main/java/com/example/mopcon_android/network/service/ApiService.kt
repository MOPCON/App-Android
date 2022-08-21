package com.example.mopcon_android.network.service

import com.example.mopcon_android.network.model.agenda.AgendaResponse
import com.example.mopcon_android.network.model.home.HomeBannerNewsResponse
import com.example.mopcon_android.network.model.news.NewsResponse
import com.example.mopcon_android.util.Constants
import retrofit2.Response
import retrofit2.http.GET

interface ApiService {
    @GET(Constants.MOPCON_API_URL + "api/2022/home")
    suspend fun getHomeBannerAndNews(): Response<HomeBannerNewsResponse>

    @GET(Constants.MOPCON_API_URL + "api/2022/news")
    suspend fun getNews(): Response<NewsResponse>

    @GET(Constants.MOPCON_API_URL + "api/2022/session")
    suspend fun getAgenda(): Response<AgendaResponse>


}