package com.example.mopcon_android.db

import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import com.example.mopcon_android.MyApplication

@Database(entities = [AgendaData::class], version = 1)
abstract class AppDatabase : RoomDatabase() {

    abstract fun searchHistoryDao(): AgendaDao

    companion object {
        val instance: AppDatabase by lazy {
            Room.databaseBuilder(
                MyApplication.application,
                AppDatabase::class.java, "AppDatabase.db")
                .build()
        }
    }
}