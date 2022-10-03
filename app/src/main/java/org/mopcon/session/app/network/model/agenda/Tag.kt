package org.mopcon.session.app.network.model.agenda


import android.os.Parcelable
import com.squareup.moshi.Json
import kotlinx.parcelize.Parcelize

@Parcelize
data class Tag(
    @Json(name = "color")
    val color: ColorData,
    @Json(name = "name")
    val name: String
): Parcelable