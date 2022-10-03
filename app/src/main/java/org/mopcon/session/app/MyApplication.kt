package org.mopcon.session.app

import android.app.Application
import org.koin.android.ext.koin.androidContext
import org.koin.androidx.viewmodel.dsl.viewModel
import org.koin.core.context.startKoin
import org.koin.core.module.Module
import org.koin.dsl.module
import org.mopcon.session.app.db.AppDatabase
import org.mopcon.session.app.network.ApiServiceModule
import org.mopcon.session.app.network.OkHttpClientProvider
import org.mopcon.session.app.repository.AgendaRepository
import org.mopcon.session.app.ui.all.SplashViewModel
import org.mopcon.session.app.ui.all.agenda.AgendaViewModel
import org.mopcon.session.app.ui.all.home.HomeViewModel
import org.mopcon.session.app.ui.all.more.host_community.HostCommunityViewModel
import org.mopcon.session.app.ui.all.more.speaker.SpeakerViewModel
import org.mopcon.session.app.ui.all.more.sponsor.SponsorViewModel
import org.mopcon.session.app.ui.all.more.sponsor.detail.agenda.MoreAgendaDetailViewModel
import org.mopcon.session.app.ui.all.news.NewsViewModel

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