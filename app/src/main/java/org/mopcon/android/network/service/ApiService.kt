package org.mopcon.android.network.service

import org.mopcon.android.network.model.community.CommunityResponse
import org.mopcon.android.network.model.community_detail.CommunityDetailResponse
import org.mopcon.android.network.model.agenda.AgendaResponse
import org.mopcon.android.network.model.agenda_detail.AgendaDetailResponse
import org.mopcon.android.network.model.agenda_detail.ExchangeDetailResponse
import org.mopcon.android.network.model.home.HomeBannerNewsResponse
import org.mopcon.android.network.model.initial.InitialResponse
import org.mopcon.android.network.model.more.speaker.SpeakerResponse
import org.mopcon.android.network.model.more.sponsor.SponsorDetailData
import org.mopcon.android.network.model.more.sponsor.SponsorResponse
import org.mopcon.android.network.model.news.NewsResponse
import org.mopcon.android.network.model.volunteer.VolunteerResponse
import org.mopcon.android.network.model.volunteer_detail.VolunteerDetailResponse
import org.mopcon.android.util.Constants
import retrofit2.Response
import retrofit2.http.GET
import retrofit2.http.Path

interface ApiService {
    @GET(Constants.MOPCON_API_URL + "api/2022/home")
    suspend fun getHomeBannerAndNews(): Response<HomeBannerNewsResponse>

    @GET(Constants.MOPCON_API_URL + "api/2022/news")
    suspend fun getNews(): Response<NewsResponse>

    @GET(Constants.MOPCON_API_URL + "api/2022/session")
    suspend fun getAgenda(): Response<AgendaResponse>

    @GET(Constants.MOPCON_API_URL + "api/2022/session/{session_id}")
    suspend fun getAgendaDetail(
        @Path("session_id") id: Int
    ): Response<AgendaDetailResponse>

    @GET(Constants.MOPCON_API_URL + "api/2022/unconf/{session_id}")
    suspend fun getExchangeDetail(
        @Path("session_id") id: Int
    ): Response<ExchangeDetailResponse>

    @GET(Constants.MOPCON_API_URL + "api/2022/unconf")
    suspend fun getExchange(): Response<AgendaResponse>

    @GET(Constants.MOPCON_API_URL + "api/2022/speaker")
    suspend fun getSpeaker(): Response<SpeakerResponse>

    @GET(Constants.MOPCON_API_URL + "api/2022/sponsor")
    suspend fun getSponsor(): Response<SponsorResponse>

    @GET(Constants.MOPCON_API_URL + "api/2022/sponsor/{sponsor_id}")
    suspend fun getSponsorDetail(
        @Path("sponsor_id") id: Int
    ): Response<SponsorDetailData>

    @GET(Constants.MOPCON_API_URL + "api/2022/initial")
    suspend fun getInitial(): Response<InitialResponse>

    @GET(Constants.MOPCON_API_URL + "api/2022/volunteer")
    suspend fun getVolunteer(): Response<VolunteerResponse>

    @GET(Constants.MOPCON_API_URL + "api/2022/volunteer/{id}")
    suspend fun getVolunteerDetail(
        @Path("id") id: Int
    ): Response<VolunteerDetailResponse>

    @GET(Constants.MOPCON_API_URL + "api/2022/community")
    suspend fun getCommunity(): Response<CommunityResponse>

    @GET(Constants.MOPCON_API_URL + "api/2022/community/participant/{id}")
    suspend fun getCommunityDetail(
        @Path("id") id: Int
    ): Response<CommunityDetailResponse>


}