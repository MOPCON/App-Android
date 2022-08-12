package com.example.mopcon_android.network.service

import com.example.mopcon_android.network.model.agenda.AgendaResponse
import com.example.mopcon_android.network.model.home.HomeBannerResponse
import com.example.mopcon_android.util.Constants
import retrofit2.Response
import retrofit2.http.GET
import retrofit2.http.Query

interface HomeApiService {
    @GET(Constants.MOPCON_API_URL + "api/2022/home")
    suspend fun getHomeBannerAndNews(): Response<HomeBannerResponse>

}