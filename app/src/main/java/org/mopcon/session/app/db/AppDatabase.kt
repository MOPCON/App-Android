package org.mopcon.session.app.db

import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import androidx.room.TypeConverters
import org.mopcon.session.app.MyApplication

@Database(entities = [AgendaFavData::class], version = 1)
@TypeConverters(DataConverter::class)
abstract class AppDatabase : RoomDatabase() {

    abstract fun searchHistoryDao(): AgendaDao

    companion object {
        val instance: AppDatabase by lazy {
            Room.databaseBuilder(
                MyApplication.application,
                AppDatabase::class.java, "AppDatabase.db")
//                .addTypeConverter(DataConverter)
                .build()
        }
    }
}