package org.mopcon.session.app.network.model.more.sponsor


import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass
import kotlinx.parcelize.Parcelize
import android.os.Parcelable

@JsonClass(generateAdapter = true)
@Parcelize
data class SponsorDetailData(
    @Json(name = "about_us")
    val aboutUs: String?,
    @Json(name = "about_us_e")
    val aboutUsE: String?,
    @Json(name = "career_information")
    val careerInformation: String?,
    @Json(name = "facebook_url")
    val facebookUrl: String?,
    @Json(name = "logo_path")
    val logoPath: Logo?,
    @Json(name = "name")
    val name: String = "",
    @Json(name = "name_e")
    val nameE: String?,
    @Json(name = "official_website")
    val officialWebsite: String?,
    @Json(name = "speaker_information")
    val speakerInformation: List<SpeakerInfoData>? = listOf(),
    @Json(name = "sponsor_id")
    val sponsorId: Int,
    @Json(name = "sponsor_type")
    val sponsorType: String?
) : Parcelable