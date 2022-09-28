package org.mopcon.android.network

import org.mopcon.android.network.service.ApiService
import org.mopcon.android.util.Constants
import com.squareup.moshi.Moshi
import com.squareup.moshi.kotlin.reflect.KotlinJsonAdapterFactory
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.moshi.MoshiConverterFactory
import java.util.concurrent.TimeUnit


class ApiServiceModule(private val okHttpClient: OkHttpClient) {

    private val moshi = Moshi.Builder()
        .add(KotlinJsonAdapterFactory())
        .build()

    private val retrofit = Retrofit.Builder()
        .addConverterFactory(MoshiConverterFactory.create(moshi))
        .baseUrl(Constants.getApiUrl())
        .client(okHttpClient)
        .build()

    fun createApiService(): ApiService = retrofit.create(ApiService::class.java)
}

class OkHttpClientProvider {

    fun createOkHttpClient(): OkHttpClient {
        val logInterceptor = HttpLoggingInterceptor()
        logInterceptor.level = HttpLoggingInterceptor.Level.BODY

        val httpBuilder = OkHttpClient().newBuilder()
        httpBuilder.connectTimeout(10000, TimeUnit.SECONDS)
        httpBuilder.readTimeout(10000, TimeUnit.SECONDS)
        httpBuilder.callTimeout(10000, TimeUnit.SECONDS)
        httpBuilder.addInterceptor(logInterceptor)
        return httpBuilder.build()
    }
}