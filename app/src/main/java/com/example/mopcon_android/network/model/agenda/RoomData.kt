package com.example.mopcon_android.network.model.agenda


import android.os.Parcelable
import com.squareup.moshi.Json
import kotlinx.parcelize.Parcelize

@Parcelize
data class RoomData(
    @Json(name = "community_partner")
    val communityPartner: String,
    @Json(name = "ended_at")
    val endedAt: Long? = null,
    @Json(name = "floor")
    val floor: String,
    @Json(name = "is_keynote")
    val isKeynote: Boolean,
    @Json(name = "is_online")
    val isOnline: Boolean,
    @Json(name = "level")
    val level: String,
    @Json(name = "link_slide")
    val linkSlide: String,
    @Json(name = "recordable")
    val recordable: Boolean,
    @Json(name = "room")
    val room: String,
    @Json(name = "session_id")
    val sessionId: Int,
    @Json(name = "speakers")
    val speakers: List<Speaker>,
    @Json(name = "sponsor_id")
    val sponsorId: Int,
    @Json(name = "sponsor_info")
    val sponsorInfo: SponsorInfo? = null,
    @Json(name = "started_at")
    val startedAt: Long? = null,
    @Json(name = "summary")
    val summary: String,
    @Json(name = "summary_e")
    val summaryE: String ?= null,
    @Json(name = "tags")
    val tags: List<Tag>,
    @Json(name = "topic")
    val topic: String,
    @Json(name = "topic_e")
    val topicE: String ?= null
): Parcelable