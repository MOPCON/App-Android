package com.example.mopcon_android.ui.all.news

import android.content.Intent
import android.net.Uri
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.mopcon_android.databinding.FragmentNewsBinding
import com.example.mopcon_android.ui.base.BaseBindingFragment
import com.example.mopcon_android.ui.extension.BottomItemDecoration
import org.koin.androidx.viewmodel.ext.android.viewModel

class NewsFragment : BaseBindingFragment<FragmentNewsBinding>() {

    override val bindingInflater: (LayoutInflater, ViewGroup?, Boolean) -> FragmentNewsBinding = FragmentNewsBinding::inflate

    private val viewModel: NewsViewModel by viewModel()

    private val newsAdapter by lazy {
        NewsAdapter(
            NewsItemClickListener {
                context?.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(it)))
            })
    }

    override fun initLayout() {
        binding.rvNews.apply {
            adapter = newsAdapter
            layoutManager = LinearLayoutManager(context, LinearLayoutManager.VERTICAL, false)
            addItemDecoration(BottomItemDecoration(16))
        }

    }

    override fun initAction() {
        viewModel.getNews()
    }

    override fun initObserver() {
        viewModel.news.observe(viewLifecycleOwner) {
            newsAdapter.submitList(it)
        }

        viewModel.isLoading.observe(viewLifecycleOwner) {
            if (it) loading() else hideLoading()
        }
    }

}
