package org.mopcon.android.network.model.community


import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass
import kotlinx.parcelize.Parcelize
import android.os.Parcelable

@JsonClass(generateAdapter = true)
@Parcelize
data class Community(
    @Json(name = "community")
    val community: List<CommunityData>? = listOf(),
    @Json(name = "participant")
    val participant: List<CommunityData>? = listOf()
) : Parcelable