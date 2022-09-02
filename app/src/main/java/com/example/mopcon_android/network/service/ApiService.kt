package com.example.mopcon_android.network.service

import com.example.mopcon_android.network.community.CommunityResponse
import com.example.mopcon_android.network.model.agenda.AgendaResponse
import com.example.mopcon_android.network.model.home.HomeBannerNewsResponse
import com.example.mopcon_android.network.model.initial.InitialResponse
import com.example.mopcon_android.network.model.more.speaker.SpeakerResponse
import com.example.mopcon_android.network.model.more.sponsor.SponsorResponse
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

    @GET(Constants.MOPCON_API_URL + "api/2022/unconf")
    suspend fun getExchange(): Response<AgendaResponse>

    @GET(Constants.MOPCON_API_URL + "api/2022/speaker")
    suspend fun getSpeaker(): Response<SpeakerResponse>

    @GET(Constants.MOPCON_API_URL + "api/2022/sponsor")
    suspend fun getSponsor(): Response<SponsorResponse>

    @GET(Constants.MOPCON_API_URL + "api/2022/initial")
    suspend fun getInitial(): Response<InitialResponse>

    @GET(Constants.MOPCON_API_URL + "api/2022/volunteer")
    suspend fun getVolunteer(): Response<InitialResponse>

    @GET(Constants.MOPCON_API_URL + "api/2022/community")
    suspend fun getCommunity(): Response<CommunityResponse>


}