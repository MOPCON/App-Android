package com.example.mopcon_android.network.model.agenda


import com.squareup.moshi.Json

data class Period(
    @Json(name = "ended_at")
    val endedAt: Int,
    @Json(name = "event")
    val event: String,
    @Json(name = "isBroadCast")
    val isBroadCast: Boolean,
    @Json(name = "room")
    val room: List<Room>,
    @Json(name = "started_at")
    val startedAt: Int
)