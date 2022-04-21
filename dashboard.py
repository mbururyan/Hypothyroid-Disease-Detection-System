# Dash Libraries
import dash
from dash import html
from dash import dcc
import plotly.express as px
import plotly.graph_objects as go
from dash.dependencies import Output, Input
import dash_bootstrap_components as dbc
import researchpy as rp

# DS and ML libraries
import pandas as pd
import numpy as np


# Application initialization
app = dash.Dash(external_stylesheets=[dbc.themes.BOOTSTRAP])

# Dataset
df = pd.read_csv('/Users/RyanMburu/Desktop/DS Projects/Thyroid Disease Detector/Datasets/clean_hypothyroid2.csv')

# Information Cards

card_age = dbc.Card(
    [
        dbc.CardHeader('Most Affected Age Group : '),
        dbc.CardBody(
            [
                html.P('50 - 55 Years')
            ]
        )
    ]
)

card_gender = dbc.Card(
    [
        dbc.CardHeader('Most Affected Gender: '),
        dbc.CardBody(
            [
                html.P('Female')
            ]
        )
    ]
)

card_symptoms = dbc.Card(
    [
        dbc.CardHeader('Patients with symptoms ?: '),
        dbc.CardBody(
            [
                html.P('6 % ')
            ]
        )
    ]
)

card_meds = dbc.Card(
    [
        dbc.CardHeader('Patients on meds: '),
        dbc.CardBody(
            [
                html.P('20 %')
            ]
        )
    ]
)

info_cards = dbc.CardDeck(
    [
        dbc.Col(card_age, width = 'auto'),
        dbc.Col(card_gender, width = 'auto'),
        dbc.Col(card_symptoms, width = 'auto'),
        dbc.Col(card_meds, width = 20),
    ],
)

#Dropdown 4 bar charts

df_controls_1 = df[['sex', 'on thyroxine', 'sick', 'thyroid surgery', 'referral source']]

controls_1_list = list(df_controls_1)

controls_1 = dbc.Card(
    [
        html.Div(
            [
                dbc.Label('Choose demographic : '),
                dcc.Dropdown(
                    id = 'controls_1_DD',
                    options=[{'label' : i, 'value':i} for i in controls_1_list],
                    value = 'sex',
                ),
            ]
        )
    ]

)

# Dropdown 4 Scatterplot

df_controls_2 = df[['TSH', 'FTI', 'TT4', 'T4U']]

controls_2_list = list(df_controls_2)

controls_2 = dbc.Card(
    [
        html.Div(
            [
                dbc.Label('Choose measurement : '),
                dcc.Dropdown(
                    id = 'controls_2_DD',
                    options=[{'label' : i, 'value':i} for i in controls_2_list],
                    value = 'TSH',
                ),
            ]
        )
    ]

)


app.layout = dbc.Container(
    [
        html.H1('HYPOTHYROID DISEASE ANALYSIS'),
        html.Hr(),
        dbc.Row(
            [
                html.Div(
                    [
                        info_cards
                    ]
                ),
            ]
        ),
        html.Hr(),

        html.H2('Demographics of patients '),
        html.Hr(),
        dbc.Row(
            [
                dbc.Col(controls_1, md=4, width='auto'),
                dbc.Col(dcc.Graph(id = 'bar graph control1')),
            ], 
            align = 'Center',
        ),
        html.Hr(),

        html.H2('Relationship between Outcome of Disease and selected value based on the Patients age'),
        html.Hr(),
                dbc.Row(
            [
                dbc.Col(controls_2, md=4, width='auto'),
                dbc.Col(dcc.Graph(id = 'bar graph control2')),
            ], 
            align = 'Center',
        ),


    ],
    fluid = True,
)

# First bar chart callback
@app.callback(
    Output('bar graph control1', 'figure'),
    Input('controls_1_DD', 'value')
)

def bar(column):
    df_new = df_controls_1[[column]].value_counts().reset_index()
    df_new.rename(columns={0 : 'Sum of patients'}, inplace=True)
    
    plot = px.bar(df_new, x=column, y='Sum of patients', color=column)
    return plot


# Second scatter 
@app.callback(
    Output('bar graph control2', 'figure'),
    Input('controls_2_DD', 'value')
)

def bar(column2):
    
    plot2 = px.scatter(df, x='age', y=column2, color = 'output')
    return plot2


# Call the app
if __name__ == '__main__':
    app.run_server(debug=True, dev_tools_ui=False)