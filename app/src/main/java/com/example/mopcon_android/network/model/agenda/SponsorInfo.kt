package com.example.mopcon_android.network.model.agenda


import android.os.Parcelable
import com.example.mopcon_android.network.model.more.sponsor.Logo
import com.squareup.moshi.Json
import kotlinx.parcelize.Parcelize

@Parcelize
data class SponsorInfo(
    @Json(name = "logo_path")
    val logoPath: Logo?,
    @Json(name = "name")
    val name: String,
    @Json(name = "name_e")
    val nameE: String
): Parcelable