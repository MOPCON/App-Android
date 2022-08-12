package com.example.mopcon_android.ui.all.more

import android.view.LayoutInflater
import android.view.ViewGroup
import com.example.mopcon_android.databinding.FragmentMoreBinding
import com.example.mopcon_android.ui.base.BaseBindingFragment

class MoreFragment : BaseBindingFragment<FragmentMoreBinding>() {

    override val bindingInflater: (LayoutInflater, ViewGroup?, Boolean) -> FragmentMoreBinding
        get() = FragmentMoreBinding::inflate

    override fun initLayout() {

    }

    override fun initAction() {

    }

    override fun initObserver() {

    }


}