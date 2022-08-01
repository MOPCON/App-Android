package com.example.mopcon_android.ui.all.agenda

import android.view.LayoutInflater
import android.view.ViewGroup
import com.example.mopcon_android.databinding.FragmentAgendaBinding
import com.example.mopcon_android.ui.all.home.HomeViewModel
import com.example.mopcon_android.ui.base.BaseBindingFragment
import org.koin.androidx.viewmodel.ext.android.viewModel

class AgendaFragment : BaseBindingFragment<FragmentAgendaBinding>() {

    override val bindingInflater: (LayoutInflater, ViewGroup?, Boolean) -> FragmentAgendaBinding = FragmentAgendaBinding::inflate

    private val viewModel: HomeViewModel by viewModel()
    override fun initLayout() {
    }

    override fun initAction() {
        TODO("Not yet implemented")
    }

    override fun initObserver() {
        TODO("Not yet implemented")
    }


}