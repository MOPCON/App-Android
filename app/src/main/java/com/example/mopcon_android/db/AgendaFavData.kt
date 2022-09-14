package com.example.mopcon_android.db

import androidx.room.ColumnInfo
import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "agenda_table")
data class AgendaFavData(
    @PrimaryKey(autoGenerate = false)
    val sessionId: Int,

    @ColumnInfo(name = "start_at")
    val startAt: Long,

    @ColumnInfo(name = "time")
    val time: String,

    @ColumnInfo(name = "topic")
    val topic: String,

    @ColumnInfo(name = "topic_e")
    val topicE: String,

    @ColumnInfo(name = "tags")
    val tags: String,

    @ColumnInfo(name = "names")
    val names: String,

    @ColumnInfo(name = "names_e")
    val namesE: String,

    @ColumnInfo(name = "location")
    val location: String,
)