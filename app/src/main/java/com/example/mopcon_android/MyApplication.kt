package com.example.mopcon_android

import android.app.Application
import com.example.mopcon_android.db.AppDatabase
import com.example.mopcon_android.network.ApiServiceModule
import com.example.mopcon_android.network.OkHttpClientProvider
import com.example.mopcon_android.ui.all.home.HomeRepository
import com.example.mopcon_android.ui.all.home.HomeViewModel
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
        single { ApiServiceModule(get()) }
        single { OkHttpClientProvider() }
        single { get<OkHttpClientProvider>().createOkHttpClient() }
        single { get<ApiServiceModule>().createApiService() }
    }

    private val repositoryModules = module {
        single { HomeRepository(get()) }
//        single { AgendaRepository(get(), get()) }
    }

    private val viewModelModules = module {
        viewModel { HomeViewModel(get()) }
//        viewModel { AgendaViewModel() }
    }

    private val databaseModules: Module = module {
        single { AppDatabase.instance }
        single { get<AppDatabase>().searchHistoryDao() }
    }

}