package com.example.mopcon_android.network

import com.example.mopcon_android.network.service.AgendaApiService
import com.example.mopcon_android.network.service.HomeApiService
import com.example.mopcon_android.util.Constants
import com.squareup.moshi.Moshi
import com.squareup.moshi.kotlin.reflect.KotlinJsonAdapterFactory
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.moshi.MoshiConverterFactory
import java.util.concurrent.TimeUnit


class ApiService(private val okHttpClient: OkHttpClient) {

    private val moshi = Moshi.Builder()
        .add(KotlinJsonAdapterFactory())
        .build()

    private val retrofit = Retrofit.Builder()
        .addConverterFactory(MoshiConverterFactory.create(moshi))
        .baseUrl(Constants.MOPCON_API_URL)
        .client(okHttpClient)
        .build()

    fun createHomeService(): HomeApiService = retrofit.create(HomeApiService::class.java)
    fun createAgendaService(): AgendaApiService = retrofit.create(AgendaApiService::class.java)

}

class OkHttpClientProvider {

    fun createOkHttpClient(): OkHttpClient {
        val logInterceptor = HttpLoggingInterceptor()
        logInterceptor.level = HttpLoggingInterceptor.Level.BODY

        val httpBuilder = OkHttpClient().newBuilder()
        httpBuilder.connectTimeout(300, TimeUnit.SECONDS)
        httpBuilder.readTimeout(300, TimeUnit.SECONDS)
        httpBuilder.callTimeout(300, TimeUnit.SECONDS)
        httpBuilder.addInterceptor(logInterceptor)
        return httpBuilder.build()
    }
}