package com.example.mopcon_android.network.model.agenda


import com.squareup.moshi.Json

data class Room(
    @Json(name = "community_partner")
    val communityPartner: String,
    @Json(name = "ended_at")
    val endedAt: Int,
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
    val sponsorInfo: SponsorInfo,
    @Json(name = "started_at")
    val startedAt: Int,
    @Json(name = "summary")
    val summary: String,
    @Json(name = "summary_e")
    val summaryE: String,
    @Json(name = "tags")
    val tags: List<Tag>,
    @Json(name = "topic")
    val topic: String,
    @Json(name = "topic_e")
    val topicE: String
)