package com.example.mopcon_android.ui.all.news

import android.view.LayoutInflater
import android.view.ViewGroup
import com.example.mopcon_android.databinding.FragmentMoreBinding
import com.example.mopcon_android.databinding.FragmentNewsBinding
import com.example.mopcon_android.ui.all.home.HomeViewModel
import com.example.mopcon_android.ui.base.BaseBindingFragment
import org.koin.androidx.viewmodel.ext.android.viewModel

class NewsFragment : BaseBindingFragment<FragmentNewsBinding>() {

    override val bindingInflater: (LayoutInflater, ViewGroup?, Boolean) -> FragmentNewsBinding
        get() = FragmentNewsBinding::inflate

    private val viewModel: NewsViewModel by viewModel()

    override fun initLayout() {
        //TODO: init RecyclerView, set RecyclerView's layoutManager & adapter
    }

    override fun initAction() {
        // TODO: let viewModel call api
    }

    override fun initObserver() {

        // TODO: observe LiveData, give value to RecyclerView's Adapter
    }

}