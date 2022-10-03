package org.mopcon.session.app.ui.all.news

import androidx.lifecycle.*
import org.mopcon.session.app.network.model.news.NewsData
import org.mopcon.session.app.network.service.ApiService
import org.mopcon.session.app.util.request
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class NewsViewModel(private val apiService: ApiService) : ViewModel() {

    private val _isLoading = MutableLiveData<Boolean>()
    val isLoading: LiveData<Boolean> = _isLoading

    private val _news = MutableLiveData<List<NewsData>>()
    val news: LiveData<List<NewsData>> = _news

    fun getNews() {
        viewModelScope.launch(Dispatchers.IO) {
            _isLoading.postValue(true)
            request(
                request = { apiService.getNews() },
                onSuccess = {
                    _isLoading.postValue(false)
                    _news.postValue(it.body()?.newsData ?: listOf())
                },
                onError = {
                    _isLoading.postValue(false)
                }
            )
        }
    }

}
