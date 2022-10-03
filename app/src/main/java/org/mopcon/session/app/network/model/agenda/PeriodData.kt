package org.mopcon.session.app.network.model.agenda


import com.squareup.moshi.Json

data class PeriodData(
    @Json(name = "ended_at")
    val endedAt: Long? = null,
    @Json(name = "event")
    val event: String? = null,
    @Json(name = "isBroadCast")
    val isBroadCast: Boolean? = null,
    @Json(name = "room")
    val room: List<RoomData>? = listOf(),
    @Json(name = "started_at")
    val startedAt: Long? = null
)