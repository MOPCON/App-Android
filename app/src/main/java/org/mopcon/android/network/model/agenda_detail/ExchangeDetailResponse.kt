package org.mopcon.android.network.model.agenda_detail


import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass
import org.mopcon.android.network.model.agenda.RoomData

@JsonClass(generateAdapter = true)
data class ExchangeDetailResponse(
    @Json(name = "data")
    val `data`: List<RoomData>,
    @Json(name = "message")
    val message: String?,
    @Json(name = "success")
    val success: Boolean?
)