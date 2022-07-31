package com.example.mopcon_android

import android.app.Application
import com.example.mopcon_android.db.AppDatabase
import com.example.mopcon_android.network.ApiService
import com.example.mopcon_android.network.OkHttpClientProvider
import com.example.mopcon_android.repository.AgendaRepository
import com.example.mopcon_android.ui.all.agenda.AgendaViewModel
import com.example.mopcon_android.ui.all.main.MainViewModel
import org.koin.android.ext.koin.androidContext
import org.koin.androidx.viewmodel.dsl.viewModel
import org.koin.core.context.startKoin
import org.koin.core.module.Module
import org.koin.dsl.module

class MyApplication : Application() {

    companion object {
        lateinit var application: Application
    }

    override fun onCreate() {
        super.onCreate()
        application = this

        startKoin {
            androidContext(this@MyApplication)
            modules(listOf(viewModelModules, apiModules, repositoryModules, databaseModules))
        }
    }

    private val apiModules: Module = module {
        single { get<OkHttpClientProvider>().createOkHttpClient() }
        single { get<ApiService>().createAgendaService() }
        single { ApiService(get()) }
        single { OkHttpClientProvider() }
    }

    private val repositoryModules = module {
        single { AgendaRepository(get(), get()) }
    }

    private val viewModelModules = module {
        viewModel { MainViewModel() }
        viewModel { AgendaViewModel() }
    }

    private val databaseModules: Module = module {
        single { AppDatabase.instance }
        single { get<AppDatabase>().searchHistoryDao() }
    }

}