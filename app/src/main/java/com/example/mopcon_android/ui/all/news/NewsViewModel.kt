package com.example.mopcon_android.ui.all.news

import androidx.lifecycle.*
import com.example.mopcon_android.network.model.news.NewsData
import com.example.mopcon_android.util.request
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class NewsViewModel(private val repository: NewsRepository) : ViewModel() {

    private val _isLoading = MutableLiveData<Boolean>()
    val isLoading: LiveData<Boolean> = _isLoading

    private val _news = MutableLiveData<List<NewsData>>()
    val news: LiveData<List<NewsData>> = _news

    fun getNews() {
        viewModelScope.launch(Dispatchers.IO) {
            _isLoading.postValue(true)
            request(
                request = { repository.getNews() },
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
