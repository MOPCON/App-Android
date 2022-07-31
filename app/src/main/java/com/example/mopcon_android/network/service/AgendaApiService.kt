package com.example.mopcon_android.network.service

import com.example.mopcon_android.network.model.agenda.AgendaResponse
import com.example.mopcon_android.util.Constants
import retrofit2.Response
import retrofit2.http.GET
import retrofit2.http.Query

interface AgendaApiService {

    @GET(Constants.MOPCON_API_URL)
    suspend fun getAgenda(
        @Query("value") value: String? = null,
        //TODO: input call api values.
    ): Response<AgendaResponse>

}