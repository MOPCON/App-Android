package com.example.mopcon_android.network.model.agenda_detail


import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass
import kotlinx.parcelize.Parcelize
import android.os.Parcelable
import com.example.mopcon_android.network.model.more.sponsor.Logo

@JsonClass(generateAdapter = true)
data class SponsorInfo(
    @Json(name = "logo_path")
    val logoPath: Logo?,
    @Json(name = "name")
    val name: String?,
    @Json(name = "name_e")
    val nameE: String?
)