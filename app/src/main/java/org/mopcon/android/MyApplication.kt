package org.mopcon.android

import android.app.Application
import org.koin.android.ext.koin.androidContext
import org.koin.androidx.viewmodel.dsl.viewModel
import org.koin.core.context.startKoin
import org.koin.core.module.Module
import org.koin.dsl.module
import org.mopcon.android.db.AppDatabase
import org.mopcon.android.network.ApiServiceModule
import org.mopcon.android.network.OkHttpClientProvider
import org.mopcon.android.repository.AgendaRepository
import org.mopcon.android.ui.all.SplashViewModel
import org.mopcon.android.ui.all.agenda.AgendaViewModel
import org.mopcon.android.ui.all.home.HomeViewModel
import org.mopcon.android.ui.all.more.host_community.HostCommunityViewModel
import org.mopcon.android.ui.all.more.speaker.SpeakerViewModel
import org.mopcon.android.ui.all.more.sponsor.SponsorViewModel
import org.mopcon.android.ui.all.more.sponsor.detail.agenda.MoreAgendaDetailViewModel
import org.mopcon.android.ui.all.news.NewsViewModel

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
        single { AgendaRepository(get(), get()) }
    }

    private val viewModelModules = module {
        viewModel { SplashViewModel(get()) }
        viewModel { HomeViewModel(get(), get()) }
        viewModel { AgendaViewModel(get()) }
        viewModel { NewsViewModel(get()) }
        viewModel { SpeakerViewModel(get(), get()) }
        viewModel { SponsorViewModel(get(), get()) }
        viewModel { HostCommunityViewModel(get()) }
        viewModel { MoreAgendaDetailViewModel(get(), get()) }
    }

    private val databaseModules: Module = module {
        single { AppDatabase.instance }
        single { get<AppDatabase>().searchHistoryDao() }
    }

}