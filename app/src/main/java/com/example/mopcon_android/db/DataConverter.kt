package com.example.mopcon_android.db

import androidx.room.ProvidedTypeConverter
import androidx.room.TypeConverter
import com.example.mopcon_android.network.model.agenda.Tag
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken

@ProvidedTypeConverter
object DataConverter {

    private val gson = Gson()

    @TypeConverter
    fun fromStringList(value: List<String>? = listOf()): String {
        val type = object : TypeToken<List<String>>() {}.type
        return gson.toJson(value, type)
    }

    @TypeConverter
    fun toStringList(value: String): List<String> {
        val type = object : TypeToken<List<String>>() {}.type
        return gson.fromJson(value, type)
    }

    @TypeConverter
    fun fromTagList(value: List<Tag>? = listOf()): String {
        val type = object : TypeToken<List<Tag>>() {}.type
        return gson.toJson(value, type)
    }

    @TypeConverter
    fun toTagList(value: String): List<Tag> {
        val type = object : TypeToken<List<Tag>>() {}.type
        return gson.fromJson(value, type)
    }

}
