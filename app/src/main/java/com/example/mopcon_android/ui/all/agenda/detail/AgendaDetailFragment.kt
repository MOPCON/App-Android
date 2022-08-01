package com.example.mopcon_android.ui.all.agenda.detail

import android.view.LayoutInflater
import android.view.ViewGroup
import com.bumptech.glide.Glide
import com.example.mopcon_android.R
import com.example.mopcon_android.databinding.FragmentAgendaDetailBinding
import com.example.mopcon_android.ui.base.BaseBindingFragment
import org.koin.androidx.viewmodel.ext.android.viewModel

class AgendaDetailFragment : BaseBindingFragment<FragmentAgendaDetailBinding>() {

    override val bindingInflater: (LayoutInflater, ViewGroup?, Boolean) -> FragmentAgendaDetailBinding = FragmentAgendaDetailBinding::inflate

//    private val viewModel: AgendaDetailViewModel by viewModel()

    private val testUrl = "https://i1.kknews.cc/DGWUD0aD7sV2MS8YBnprAEEcmSjyXtHejnqwN0A/0.jpg"

    override fun initLayout() {
        context?.let {
            Glide.with(it)
                .load(testUrl)
                .circleCrop()
                .placeholder(R.drawable.ic_avatar_default_logo)
                .into(binding.ivAvatar)

        }

    }

    override fun initAction() {
    }

    override fun initObserver() {
    }


}