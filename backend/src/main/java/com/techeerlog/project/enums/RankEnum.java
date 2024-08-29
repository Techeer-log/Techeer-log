package com.techeerlog.project.enums;

import com.techeerlog.global.support.EnumModel;
import lombok.Getter;

@Getter
public enum RankEnum implements EnumModel {
    FIRST("FIRST"),
    SECOND("SECOND"),
    THIRD("THIRD"),
    FOURTH("FOURTH"),
    FIFTH("FIFTH"),
    NONE("NONE")
    ;

    private final String name;

    RankEnum(String name) {
        this.name = name;
    }
}
