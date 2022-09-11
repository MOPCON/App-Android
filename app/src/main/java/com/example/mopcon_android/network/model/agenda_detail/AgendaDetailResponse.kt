package com.example.mopcon_android.network.model.agenda_detail


import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass
import kotlinx.parcelize.Parcelize
import android.os.Parcelable
import com.example.mopcon_android.network.model.agenda.RoomData

@JsonClass(generateAdapter = true)
data class AgendaDetailResponse(
    @Json(name = "data")
    val `data`: RoomData,
    @Json(name = "message")
    val message: String?,
    @Json(name = "success")
    val success: Boolean?
)