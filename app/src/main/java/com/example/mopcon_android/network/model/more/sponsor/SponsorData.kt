package com.example.mopcon_android.network.model.more.sponsor


import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass
import kotlinx.parcelize.Parcelize
import android.os.Parcelable
import com.example.mopcon_android.ui.all.more.sponsor.SponsorAdapter

@JsonClass(generateAdapter = true)
@Parcelize
data class SponsorData(
    @Json(name = "data")
    val sponsorDetailData: List<SponsorDetailData>?,
    @Json(name = "name")
    val name: String?,
    @Json(name = "name_e")
    val nameE: String?
) : Parcelable